package org.mopcon.android.ui.all.task

import android.app.ProgressDialog
import android.content.Context
import android.graphics.Bitmap
import android.net.http.SslError
import android.os.Message
import android.util.Log
import android.view.KeyEvent
import android.webkit.*


class MyWebViewClient(context: Context?) : WebViewClient() {

    private val progDailog: ProgressDialog by lazy {
        ProgressDialog.show(context, "Loading", "Please wait...", true).apply {
            setCancelable(false)
        }
    }

    override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
        Log.e(">>", "onPageStarted, url = $url")
        super.onPageStarted(view, url, favicon)
    }

    override fun onPageFinished(view: WebView?, url: String?) {
        Log.e(">>", "onPageFinished, url = $url")
        progDailog.dismiss()
        super.onPageFinished(view, url)
    }

    override fun shouldOverrideUrlLoading(view: WebView, url: String): Boolean {
        Log.e(">>", "shouldOverrideUrlLoading, url = $url")
        progDailog.show()
        view.loadUrl(url)
        return true
    }

    override fun onReceivedError(view: WebView?, request: WebResourceRequest?, error: WebResourceError?) {
        super.onReceivedError(view, request, error)
        Log.e(">>", "onReceivedError, error = $error")
    }

    override fun onReceivedHttpError(view: WebView?, request: WebResourceRequest?, errorResponse: WebResourceResponse?) {
        super.onReceivedHttpError(view, request, errorResponse)
        Log.e(">>", "onReceivedHttpError, errorResponse = ${errorResponse}")
    }


    override fun onReceivedSslError(view: WebView?, handler: SslErrorHandler?, error: SslError?) {
        Log.e(">>", "error = $error")
        if (handler != null) {
            handler.proceed()
        } else {
            super.onReceivedSslError(view, null, error)
        }
    }

    override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
        Log.e(">>", "shouldOverrideUrlLoading")
        return super.shouldOverrideUrlLoading(view, request)
    }

    override fun onLoadResource(view: WebView?, url: String?) {
        Log.e(">>", "onLoadResource")
        super.onLoadResource(view, url)
    }

    override fun onPageCommitVisible(view: WebView?, url: String?) {
        Log.e(">>", "onPageCommitVisible")
        super.onPageCommitVisible(view, url)
    }

    override fun shouldInterceptRequest(view: WebView?, request: WebResourceRequest?): WebResourceResponse? {
        Log.e(">>", "shouldInterceptRequest2")
        Log.e(">>", "request method = ${request?.method}, isRedirect = ${request?.isRedirect}")
        return super.shouldInterceptRequest(view, request)
    }

    override fun onTooManyRedirects(view: WebView?, cancelMsg: Message?, continueMsg: Message?) {
        Log.e(">>", "onTooManyRedirects")
        super.onTooManyRedirects(view, cancelMsg, continueMsg)
    }

    override fun onFormResubmission(view: WebView?, dontResend: Message?, resend: Message?) {
        Log.e(">>", "onFormResubmission")
        super.onFormResubmission(view, dontResend, resend)
    }

    override fun doUpdateVisitedHistory(view: WebView?, url: String?, isReload: Boolean) {
        Log.e(">>", "doUpdateVisitedHistory")
        super.doUpdateVisitedHistory(view, url, isReload)
    }

    override fun onReceivedClientCertRequest(view: WebView?, request: ClientCertRequest?) {
        Log.e(">>", "onReceivedClientCertRequest")
        super.onReceivedClientCertRequest(view, request)
    }

    override fun onReceivedHttpAuthRequest(view: WebView?, handler: HttpAuthHandler?, host: String?, realm: String?) {
        Log.e(">>", "onReceivedHttpAuthRequest")
        super.onReceivedHttpAuthRequest(view, handler, host, realm)
    }

    override fun shouldOverrideKeyEvent(view: WebView?, event: KeyEvent?): Boolean {
        Log.e(">>", "shouldOverrideKeyEvent")
        return super.shouldOverrideKeyEvent(view, event)
    }

    override fun onUnhandledKeyEvent(view: WebView?, event: KeyEvent?) {
        Log.e(">>", "onUnhandledKeyEvent")
        super.onUnhandledKeyEvent(view, event)
    }

    override fun onScaleChanged(view: WebView?, oldScale: Float, newScale: Float) {
        Log.e(">>", "onScaleChanged")
        super.onScaleChanged(view, oldScale, newScale)
    }

    override fun onReceivedLoginRequest(view: WebView?, realm: String?, account: String?, args: String?) {
        Log.e(">>", "onReceivedLoginRequest")
        super.onReceivedLoginRequest(view, realm, account, args)
    }

    override fun onRenderProcessGone(view: WebView?, detail: RenderProcessGoneDetail?): Boolean {
        Log.e(">>", "onRenderProcessGone")
        return super.onRenderProcessGone(view, detail)
    }

    override fun onSafeBrowsingHit(view: WebView?, request: WebResourceRequest?, threatType: Int, callback: SafeBrowsingResponse?) {
        Log.e(">>", "onSafeBrowsingHit")
        super.onSafeBrowsingHit(view, request, threatType, callback)
    }
}