import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

export function DialogQrCode() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Buy with PIX</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Buy</DialogTitle>
          <DialogDescription>
            To complete your process, please send the proof of payment to
            marcio.pessoa@btracer.com.br along with the wallet address where you
            want the NFT to be sent.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center space-x-2">
          <Image src="/qrcode.png" width={400} height={700} alt="qrcode" />
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
