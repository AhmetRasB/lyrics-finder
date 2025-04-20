import React, { useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setLyrics("");
    try {
      const res = await fetch(
        `https://api.lyrics.ovh/v1/${data.artist}/${data.title}`
      );
      const json = await res.json();
      if (json.lyrics) {
        setLyrics(json.lyrics);
      } else {
        setLyrics("Not found 😔");
      }
    } catch {
      setLyrics("Not found 😔");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 flex flex-col items-center justify-start px-4 py-8 space-y-4">
      <img src="/logo.png" alt="Lyrics Finder Logo" className="w-40 mb-2" />
      <h1 className="text-3xl font-bold text-center text-blue-900">
        Lyrics Finder
      </h1>

      {/* Help Icon */}
      <button
        onClick={() => setShowHelp(true)}
        className="text-xl text-blue-700 hover:text-blue-900"
        title="How to use?"
      >
        ❓
      </button>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg space-y-4"
      >
        <input
          placeholder="Artist"
          {...register("artist", { required: true })}
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none"
        />
        <input
          placeholder="Song title"
          {...register("title", { required: true })}
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded-xl text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Loading..." : "Find Lyrics"}
        </button>
      </form>

      {/* Lyrics Output */}
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md whitespace-pre-wrap min-h-[150px] text-gray-700 text-sm">
        {lyrics || "Lyrics will appear here."}
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4">
            <h2 className="text-xl font-bold">Nasıl Kullanılır? / How to Use</h2>
            <p className="text-sm text-gray-700">
              🎤 Şarkıcı ve şarkı ismini yazın ve “Find Lyrics” butonuna basın. <br />
              🎵 Şarkı sözleri aşağıda görünecek.
            </p>
            <p className="text-sm text-gray-700 mt-2">
              🎤 Type artist and song title, then press “Find Lyrics”. <br />
              🎵 Lyrics will appear below.
            </p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl"
              onClick={() => setShowHelp(false)}
            >
              Kapat / Close
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default App;
