import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";


const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const [value, setValue] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = async () => {
    try {
      if (shortUrl) {
        await navigator.clipboard.writeText(`${window.location.origin}/${shortUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!value.trim()) {
      setError("Please enter a URL");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/v1/create-url`, {
        url: value,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data?.shortUrl?.shortUrl) {
        setShortUrl(response.data.shortUrl.shortUrl);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error shortening URL:', error);
      setError(error instanceof Error ? error.message : 'Failed to shorten URL');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          URL Shortener
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="url"
            placeholder="Shorten any link"
            onChange={handleChange}
            value={value}
            className="w-full h-12"
          />
          <Button
            type="submit"
            className="w-full h-12 shadow-sm hover:shadow-md transition-shadow"
          >
            Shorten URL
          </Button>
        </form>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        {shortUrl && (
          <div className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center gap-2">
            <p className="text-gray-600 break-all">
              {`${window.location.origin}/${shortUrl}`}
            </p>
            <Button onClick={handleCopy} variant="outline" size="sm">
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}