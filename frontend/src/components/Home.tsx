import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`localhost:3000/api/v1/${shortUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/create-url",
        {
          url: value,
        }
      );

      console.log(response.data.shortUrl.shortUrl);

      setShortUrl(response.data.shortUrl.shortUrl);
    } catch (error) {
      console.error(error);
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
            type="text"
            placeholder="Shorten any link"
            onChange={handleChange}
            className="w-full h-12"
          />
          <Button
            type="submit"
            className="w-full h-12 shadow-sm hover:shadow-md transition-shadow"
          >
            Shorten URL
          </Button>
        </form>

        {shortUrl && (
          <div className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center gap-2">
            <p className="text-gray-600 break-all">
              {`localhost:3000/api/v1/${shortUrl}`}
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
