package org.mopcon.session.app.ui.all.task

import android.app.ProgressDialog
import android.content.Context
import android.graphics.Bitmap
import android.net.http.SslError
import android.os.Message
import android.util.Log
import android.view.KeyEvent
import android.view.View
import android.webkit.*
import android.widget.ProgressBar


class MyWebViewClient(val progressBar: ProgressBar) : WebViewClient() {

    override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
        Log.e(">>", "onPageStarted, url = $url")
        super.onPageStarted(view, url, favicon)
    }

    override fun onPageFinished(view: WebView?, url: String?) {
        Log.e(">>", "onPageFinished, url = $url")
        progressBar.visibility = View.GONE
        super.onPageFinished(view, url)
    }

    override fun shouldOverrideUrlLoading(view: WebView, url: String): Boolean {
        Log.e(">>", "shouldOverrideUrlLoading, url = $url")
        view.loadUrl(url)
        return true
    }
}