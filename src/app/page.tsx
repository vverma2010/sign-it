"use client";

import { Navbar } from "@/components";
import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/use-media-query";
import { HexColorPicker } from "react-colorful";
import { Download, Eye, Palette, Trash2 } from "lucide-react";

export default function Home() {
  const [signature, setSignature] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#000");
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const signatureRef = useRef<SignatureCanvas | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 720, height: 300 });
  const [colorPickerOpen, setColorPickerOpen] = useState<boolean>(false);

  const handleSaveSignature = (): void => {
    if (signatureRef.current?.isEmpty()) {
      toast.error("Please provide a signature");
      return;
    }
    setOpen(!open);
    const output = signatureRef.current
      ?.getTrimmedCanvas()
      .toDataURL("image/png");
    setSignature(output || null);
  };

  useEffect(() => {
    // Function to update canvas size dynamically
    const updateCanvasSize = () => {
      const screenWidth = window.innerWidth;
      const newWidth = screenWidth > 1024 ? 720 : screenWidth > 768 ? 600 : 320;
      const newHeight = screenWidth > 768 ? 300 : 200;
      setCanvasSize({ width: newWidth, height: newHeight });
    };

    // Update size on mount and on window resize
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);
  return (
    <div>
      <Navbar />
      <div className="p-5">
        <h1 className="text-center text-4xl mt-20">
          Welcome to{" "}
          <span className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Signit
          </span>
        </h1>
        <p className="text-center mt-5">
          Signit is a digital signature platform that allows you to create your
          digital Signatures.
        </p>

        <div className="flex items-center justify-center flex-col mt-6 mx-auto w-full md:w-1/2">
          <SignatureCanvas
            ref={signatureRef}
            penColor={color}
            backgroundColor="#fff"
            canvasProps={{
              width: canvasSize.width,
              height: canvasSize.height,
              className: "border-2 rounded-xl flex min-h-[200px] bg-white",
            }}
            velocityFilterWeight={0.7}
            minWidth={0.8}
            maxWidth={2.5}
          />
          <div className="flex justify-between w-10/12 md:w-full gap-2 md:gap-5 mt-5">
            <Dialog open={colorPickerOpen} onOpenChange={setColorPickerOpen}>
              <DialogTrigger asChild>
                <Button className="sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 flex items-center gap-2 text-white font-semibold">
                  <Palette size={18} /> {isDesktop && "Select Color"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[300px] flex flex-col items-center">
                <DialogHeader>
                  <DialogTitle>Select Signature Color</DialogTitle>
                </DialogHeader>
                <HexColorPicker
                  color={color}
                  onChange={setColor}
                  className="mt-2"
                />
                {!!color && (
                  <p className="mt-2">
                    Selected Color: <span style={{ color }}>{color}</span>
                  </p>
                )}
                <DialogClose asChild>
                  <Button variant="outline" className="mt-4">
                    Close
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
            <Button
              className=" sm:w-auto bg-amber-500 hover:bg-amber-700 flex items-center gap-2 text-white font-semibold"
              onClick={() => {
                signatureRef.current?.clear();
                setSignature(null);
              }}
            >
              <Trash2 size={18} /> {isDesktop && "Clear"}
            </Button>

            {/* Preview Button */}
            <Button
              className="flex-grow sm:w-auto bg-emerald-500 hover:bg-emerald-700 flex items-center gap-2 text-white font-semibold"
              onClick={handleSaveSignature}
            >
              <Eye size={18} /> Preview
            </Button>

            {signature &&
              (isDesktop ? (
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button className="hidden" />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <DialogTitle>Preview Signature</DialogTitle>
                      <DialogDescription>
                        {signature && (
                          <Image
                            src={signature}
                            alt="Signature"
                            width={canvasSize.width}
                            height={canvasSize.height}
                          />
                        )}
                      </DialogDescription>
                    </DialogHeader>
                    <a
                      className="flex"
                      href={signature}
                      download="signature.png"
                    >
                      <Button className=" flex-grow">
                        {" "}
                        <Download size={18} /> Download
                      </Button>
                    </a>
                  </DialogContent>
                </Dialog>
              ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger asChild>
                    <Button className="hidden" />
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="text-left">
                      <DrawerTitle>Preview Signature</DrawerTitle>
                      <DrawerDescription>
                        {signature && (
                          <Image
                            src={signature}
                            alt="Signature"
                            width={canvasSize.width}
                            height={canvasSize.height}
                          />
                        )}
                      </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter className="pt-2">
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                      <a
                        className="flex"
                        href={signature}
                        download="signature.png"
                      >
                        <Button className=" flex-grow">
                          {" "}
                          <Download size={18} /> Download
                        </Button>
                      </a>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              ))}
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
      {/* {preview} */}
    </div>
  );
}
