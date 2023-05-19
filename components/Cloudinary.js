import { Component } from 'react'
import Head from 'next/head'

export default class CloudinaryUploadWidget extends Component {
  constructor(props) {
    super(props)
    this.uploader = null
  }

  showWidget = () => {
    const { callback } = this.props
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'vercel-platforms',
        uploadPreset: 'w0vnflc6',
        cropping: true,
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          callback(result.info)
        }
      }
    )
    widget.open()
  }

  open = (e) => {
    e.preventDefault()
    this.showWidget()
  }

  render() {
    return (
      <>
        <Head>
          <script
            src="https://widget.cloudinary.com/v2.0/global/all.js"
            type="text/javascript"
          />
        </Head>
        {this.props.children({ open: this.open })}
      </>
    )
  }
}
