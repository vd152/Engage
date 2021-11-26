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
        <div className="container">
            {
                !result &&
                <>
                    {!showScanner &&
                    <>
                    <input type="file" onChange={(e)=>{setImg(e.target.files[0])}} />
                        <button className="btn add-button m-1" onClick={() => setShowScanner(true)}>
                            <span>Verify</span>
                        </button>
                        
                    </>}
                    {showScanner &&
                    <>
                        <QRScanner onError={handleError}
                                   onScan={handleScan} img={img}/>
                        <button className="btn add-button" onClick={() => setShowScanner(false)}>BACK</button>
                        <p className="text-muted">Please add a clear image of the vaccination certificate if it's taking too long.</p>
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
