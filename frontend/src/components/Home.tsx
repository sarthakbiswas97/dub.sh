import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);

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
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center">
        <Input type="text" placeholder="Shorten any link" onChange={handleChange} />
        <Button type="submit" className="mt-4">Submit</Button>
        </div>
      </form>
      {shortUrl && <div className="border border-black rounded-md mt-4">{shortUrl}</div>}
    </div>
  );
}
