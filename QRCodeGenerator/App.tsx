import * as React from 'react'
import { Encoder, QRByte, QRKanji, ErrorCorrectionLevel } from "@nuintun/qrcode";


function App() {
    const qrcode = new Encoder();
    qrcode.write(
`BEGIN:VCARD
VERSION:3.0
N:Gonzalez;Edgardo
FN:Edgardo Gonzalo
ORG:CTB
TITLE:CIO
ADR:;;c51 a54;Bogota;;;
TEL;WORK;VOICE:
TEL;CELL:2857525
TEL;FAX:
EMAIL;WORK;INTERNET:ed@email.com
URL:www.edgarand.com
END:VCARD`);

    qrcode.make();
    var QR = qrcode.toDataURL(4);
    console.log("aca va el qr"+QR);
  return (
    <div>App

        <img src={QR}></img>
    </div>

  )
}

export default App