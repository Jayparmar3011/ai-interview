"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Wifi, WifiOff, Shield } from "lucide-react";
import { useInterviewStore } from "@/app/store/interviewstore";

export default function SystemCheckPage() {
  const router = useRouter();

  const { startInterview, setNetwork, setCamera, network, camera } =
    useInterviewStore();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // 🌐 NETWORK
  useEffect(() => {
    const online = () => setNetwork(true);
    const offline = () => setNetwork(false);

    window.addEventListener("online", online);
    window.addEventListener("offline", offline);

    return () => {
      window.removeEventListener("online", online);
      window.removeEventListener("offline", offline);
    };
  }, []);

  // 📷 CAMERA
  useEffect(() => {
    const init = async () => {
      try {
        const media = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setStream(media);
        setCamera(true);

        if (videoRef.current) {
          videoRef.current.srcObject = media;
        }
      } catch {
        setCamera(false);
      }
    };

    init();
  }, []);

  const handleStart = () => {
    startInterview();
    router.push("/interview/coding");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Shield className="text-indigo-400" />
        System Check
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* NETWORK */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-4 flex items-center gap-3">
            {network ? <Wifi /> : <WifiOff />}
            <div>
              <p>Network</p>
              <p className="text-xs text-zinc-400">
                {network ? "Online" : "Offline"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CAMERA */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-4 flex items-center gap-3">
            <Camera />
            <div>
              <p>Camera</p>
              <p className="text-xs text-zinc-400">
                {camera ? "Active" : "Blocked"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PREVIEW */}
      <div className="mt-6">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full max-w-md rounded-md border border-zinc-700"
        />
      </div>

      <Button className="mt-6" onClick={handleStart}>
        Start Interview →
      </Button>
    </div>
  );
}
