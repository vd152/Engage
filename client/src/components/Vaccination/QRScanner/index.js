import React, {Component} from 'react';
import './index.css';
import {scanImageData} from "zbar.wasm";

const SCAN_PERIOD_MS = 1000;

export default class QRScanner extends Component {
    static defaultProps = {
        className: '',
        height: 800,
        width: 800,
        videoConstraints: {
            facingMode: "environment"
        }
    };


    static mountedInstances = [];

    // static userMediaRequested = false;

    static scanTimer = null;

    constructor(props) {
        super(props);
        this.state = {
            hasUserMedia: false,
        };
    }

    componentDidMount() {
        // if (!hasGetUserMedia()) return;

        QRScanner.mountedInstances.push(this);

        // if (!this.state.hasUserMedia && !QRScanner.userMediaRequested) {
        //     this.requestUserMedia();
        // }
        let count = 0;
        QRScanner.scanTimer = setInterval(() => {
            count++;
            if(count > 20) {
                
                clearInterval(QRScanner.scanTimer)
                window.location.reload()
            };
            this.scanBarcode();
        }, SCAN_PERIOD_MS);


    }
    componentWillUnmount() {
        clearInterval(QRScanner.scanTimer);
        const index = QRScanner.mountedInstances.indexOf(this);
        QRScanner.mountedInstances.splice(index, 1);

    }

    scanBarcode = async () => {
        
        let canvas = document.createElement('canvas');
        canvas.width = this.props.width;
        canvas.height = this.props.height
        let ctx = canvas.getContext('2d');

        var selectedFile = this.props.img;
        var reader = new FileReader();
      
        var imgtag = document.getElementById("myimage");
        imgtag.title = selectedFile.name;
      
        reader.onload = function(event) {
          imgtag.src = event.target.result;
        };
      
        reader.readAsDataURL(selectedFile);

        ctx.drawImage(imgtag, 0, 0, this.props.width, this.props.height);
        let data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const symbols = await scanImageData(data);
        scanImageData(data)
        for (let i = 0; i < symbols.length; ++i) {
            const sym = symbols[i];

            this.props.onScan(sym.decode())
        }

    }


    // requestUserMedia() {
    //     navigator.getUserMedia =
    //         navigator.mediaDevices.getUserMedia ||
    //         navigator.webkitGetUserMedia ||
    //         navigator.mozGetUserMedia ||
    //         navigator.msGetUserMedia;

    //     const sourceSelected = (videoConstraints) => {
    //         const constraints = {
    //             video: videoConstraints || true,
    //         };

    //         navigator.mediaDevices
    //             .getUserMedia(constraints)
    //             .then((stream) => {
    //                 QRScanner.mountedInstances.forEach(instance =>
    //                     instance.handleUserMedia(null, stream),
    //                 );
    //             })
    //             .catch((e) => {
    //                 QRScanner.mountedInstances.forEach(instance =>
    //                     instance.handleUserMedia(e),
    //                 );
    //             });
    //     };

    //     if ('mediaDevices' in navigator) {
    //         sourceSelected(this.props.videoConstraints);
    //     } else {
    //         const optionalSource = id => ({optional: [{sourceId: id}]});

    //         const constraintToSourceId = (constraint) => {
    //             const deviceId = (constraint || {}).deviceId;

    //             if (typeof deviceId === 'string') {
    //                 return deviceId;
    //             } else if (Array.isArray(deviceId) && deviceId.length > 0) {
    //                 return deviceId[0];
    //             } else if (typeof deviceId === 'object' && deviceId.ideal) {
    //                 return deviceId.ideal;
    //             }

    //             return null;
    //         };

    //         MediaStreamTrack.getSources((sources) => {

    //             let videoSource = null;

    //             sources.forEach((source) => {
    //                 if (source.kind === 'video') {
    //                     videoSource = source.id;
    //                 }
    //             });


    //             const videoSourceId = constraintToSourceId(this.props.videoConstraints);
    //             if (videoSourceId) {
    //                 videoSource = videoSourceId;
    //             }

    //             sourceSelected(
    //                 optionalSource(videoSource),
    //             );
    //         });
    //     }

    //     QRScanner.userMediaRequested = true;
    // }

    // handleUserMedia(err, stream) {
    //     if (err) {
    //         this.setState({hasUserMedia: false});
    //         this.props.onError(err);

    //         return;
    //     }

    //     this.stream = stream;

    //     try {
    //         this.video.srcObject = stream;
    //         this.setState({hasUserMedia: true});
    //     } catch (error) {
    //         this.setState({
    //             hasUserMedia: true,
    //             src: window.URL.createObjectURL(stream),
    //         });
    //     }

    // }

    render() {
        return (
            <div id='videoview'>
                {/* <video
                    autoPlay
                    width={"100%"}
                    src={this.state.src}
                    className={this.props.className}
                    playsInline
                    style={this.props.style}
                    ref={(ref) => {
                        this.video = ref;
                    }}
                /> */}
                <img id="myimage" height="200" />

                <canvas id="overlay" width={this.props.width} height={this.props.height}/>
            </div>
        );
    }
}