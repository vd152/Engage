import React, {useState} from "react";
import "./index.css";
import {CertificateStatus} from "../CertificateStatus";
import QRScanner from "../QRScanner";
import JSZip from "jszip";
import Container from "react-bootstrap/Container";
export const CERTIFICATE_FILE = "certificate.json";


export const VerifyCertificate = () => {
    const [result, setResult] = useState("");
    const [showScanner, setShowScanner] = useState(false);
    const [img, setImg] = useState("");
    const handleScan = data => {
        if (data) {
            const zip = new JSZip();
            zip.loadAsync(data).then((contents) => {
                return contents.files[CERTIFICATE_FILE].async('text')
            }).then(function (contents) {
                setResult(contents)
            }).catch(err => {
                    setResult(data)
                }
            );

        }
    };
    const handleError = err => {
        console.error(err)
    };
   
    return (
        <div className="container-fluid">
            {
                !result &&
                <>
                    {!showScanner &&
                    <>
                    <input type="file" onChange={(e)=>{setImg(e.target.files[0])}}/>
                        <button className="custom-button green-btn" onClick={() => setShowScanner(true)}>
                            <span>Scan QR code</span>
                        </button>
                        <Container className="mt-5 p-4 mb-5">
                          
                          
                        </Container>
                    </>}
                    {showScanner &&
                    <>
                        <QRScanner onError={handleError}
                                   onScan={handleScan} img={img}/>
                        <button className="custom-button green-btn" onClick={() => setShowScanner(false)}>BACK</button>
                    </>
                    }
                </>
            }
            {
                result && <CertificateStatus certificateData={result} goBack={() => {
                    setShowScanner(false);
                    setResult("");
                }
                }/>
            }


        </div>
    )
};
