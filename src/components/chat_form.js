import React, { Component } from 'react';

export default class ChatForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            imageData: {}
        };

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openFilePicker = this.openFilePicker.bind(this);
    }

    openFilePicker() {
        document.getElementById('imageupload').click();
    }

    handleTextChange(event) {
        this.setState({
            text: event.target.value
        });
    }

    handleFileChange(event) {
        let imageData = this.fileUpload.files[0];
        this.setState({ imageData });
    }

    isObjectEmpty(obj) {
        if (Object.keys(obj).length === 0 && obj.constructor === Object) {
            return true;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.isObjectEmpty(this.state.imageData)) {
            this.convertToBase64(this.state.imageData).then((imageData) => {
                this.props.createMessage(this.state.text, imageData, this.props.sessionId);
            });
        } else if (this.state.text !== '') {
            this.props.createMessage(this.state.text, null, this.props.sessionId);
        }

        this.setState({ 
            text: '',
            imageData: {}
        });
    }

    // Returns promise of base64encoded image
    convertToBase64(file) {
        return new Promise(function(resolve, reject) { 
            let reader = new FileReader();
            let imageData;
            if (file) {
                reader.readAsDataURL(file);
            }
            reader.onload = function (e) {
                imageData = this.result;
                resolve(imageData);
            }
        });
    }

	render() {
        const isEnabled = this.state.text || !this.isObjectEmpty(this.state.imageData);
        return (
            <div className="chat__footer">
                <form id="message-form" onSubmit={this.handleSubmit}>
                    <input className="file" ref={(ref) => this.fileUpload = ref} value={this.state.file} onChange={this.handleFileChange} id="imageupload" type="file" style={{display: "none"}} accept="image/gif, image/jpeg, image/png"/>
                    <input className="message" value={this.state.text} onChange={this.handleTextChange} type="text" placeholder=" Type your message..." autoFocus autoComplete="off"/>
                    <div className="btn-container">
                        <button id="send" disabled={!isEnabled} type="submit" value="Submit"><i className="fas fa-paper-plane"></i></button>
                        <button type="button" id="image" onClick={() => this.openFilePicker()}><i className="fas fa-camera"></i>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
