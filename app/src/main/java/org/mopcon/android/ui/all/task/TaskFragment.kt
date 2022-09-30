package org.mopcon.android.ui.all.task

import android.Manifest
import android.annotation.SuppressLint
import android.content.Context
import android.content.pm.PackageManager
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.ConsoleMessage
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.widget.Toast
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import org.json.JSONObject
import org.mopcon.android.databinding.FragmentTaskBinding
import org.mopcon.android.ui.base.BaseBindingFragment
import java.util.*


class TaskFragment : BaseBindingFragment<FragmentTaskBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentTaskBinding
        get() = FragmentTaskBinding::inflate

    private val CAMERA_PERMISSION = arrayOf<String>(Manifest.permission.CAMERA)
    private val CAMERA_REQUEST_CODE = 10
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        if (!hasCameraPermission()) {
            requestPermission();
        }
        Log.e(">>>", "uuid = ${UUID.randomUUID()}")
//        Log.e(">>>", "device id = ${Settings.Secure.getString(context?.contentResolver, Settings.Secure.ANDROID_ID)}")

        return super.onCreateView(inflater, container, savedInstanceState)
    }

    override fun initLayout() {
        initWebViewSetting()
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun initWebViewSetting() {

        binding.apply {
//            val browserIntent = Intent(Intent.ACTION_VIEW, Uri.parse(Constants.getGameUrl()))
//            startActivity(browserIntent)


            val webSettings = webView.settings
            webSettings.javaScriptEnabled = true
            webSettings.loadWithOverviewMode = true
            webSettings.useWideViewPort = true
            webSettings.domStorageEnabled = true;
            webSettings.setSupportZoom(true)
            WebView.setWebContentsDebuggingEnabled(true)
            webView.webViewClient = MyWebViewClient(context)

            webView.webChromeClient = object : WebChromeClient() {
                override fun onConsoleMessage(message: ConsoleMessage): Boolean {
                    Log.e(">>>", "${message.message()} -- From line ${message.lineNumber()} of ${message.sourceId()}")
                    return true
                }
            }

//            webView.loadUrl(Constants.getGameUrl())
            webView.loadUrl("https://game.mopcon.org/#/test")

            //java 調用 js function
            webView.addJavascriptInterface(JSInterface(context) {
                webView.post {
//                    try {
                        //java 傳參數給 js
                        webView.evaluateJavascript("getDeviceIDResponse(\"${UUID.randomUUID()}\")") { value ->
                            Log.e(">>>", "getDeviceIDResponse = $value") //UUID.randomUUID()
                        }
//                    } catch (e: Exception) {
//                        Log.e(">>>", "e = $e")
//                    }
                }
            }, "nativeApp")
//            webView.addJavascriptInterface(JSInterface(), "getDeviceID()")
//            webView.addJavascriptInterface(JSInterface(), "window.nativeApp")
//            webView.addJavascriptInterface(JSInterface(), "nativeApp.getDeviceID()")

//            webView.addJavascriptInterface(JSInterface(context), "window.nativeApp.getDeviceID()")
//            webView.addJavascriptInterface(JSInterface(context), "window.loadPreference()")
//            webView.addJavascriptInterface(JSInterface(context), "window.storePreference()")
//            webView.addJavascriptInterface(JSInterface(context), "window.scanQRCode()")
//            webView.addJavascriptInterface(JSInterface(context), "window.socialShare()")
//            webView.addJavascriptInterface(JSInterface(context), "window.saveImage()")
//            webView.loadData("data", "text/html", null);
//            webView.addJavascriptInterface(JSInterface(), "nativeApp")
//            webView.loadUrl("http://www.google.com")

//            webView.evaluateJavascript("getDeviceIDResponse(${UUID.randomUUID()})") { value ->
//                Log.e(">>>", "getDeviceIDResponse = $value")
//            }

//            webView.evaluateJavascript("javascript:scanQRCode()") { value ->
//                Log.e(">>>", "call scanQRCode = $value")
//            }

//            val str = "xxx"
//            webView.loadUrl(Constants.getGameUrl(), "javascript:xxx('$str')")
//            webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        }
    }




    internal class JSInterface(val context: Context?,
                               private val getDeviceSucceed: () -> Unit) {
        @JavascriptInterface
        fun getDeviceID() {
            Log.e(">>>JSInterface", "getDeviceID")
            Toast.makeText(context, "getDeviceID", Toast.LENGTH_SHORT).show()
            getDeviceSucceed.invoke()
        }

        @JavascriptInterface
        fun loadPreference() {
            Log.e(">>>JSInterface", "loadPreference")
            Toast.makeText(context, "loadPreference", Toast.LENGTH_SHORT).show()
        }

        @JavascriptInterface
        fun storePreference(data: String) {
            try {
                val jsonResponse = JSONObject(data) //Convert from string to object, can also use JSONArray
                Log.e(">>>JSInterface", "storePreference, ${jsonResponse.toString()}")
                Toast.makeText(context, "storePreference, $jsonResponse", Toast.LENGTH_SHORT).show()
            } catch (e: Exception) {
                Log.e(">>>JSInterface", "e = $e")
            }
        }

        @JavascriptInterface
        fun scanQRCode() {
            Log.e(">>>JSInterface", "scanQRCode")
            Toast.makeText(context, "scanQRCode", Toast.LENGTH_SHORT).show()
        }

        @JavascriptInterface
        fun socialShare(data: String) {
            Log.e(">>>JSInterface", "socialShare, $data")
            Toast.makeText(context, "socialShare, $data", Toast.LENGTH_SHORT).show()
        }

        @JavascriptInterface
        fun saveImage(data: String) {
            Log.e(">>>JSInterface", "saveImage, $data")
            //image

            Toast.makeText(context, "saveImage, $data", Toast.LENGTH_SHORT).show()
        }

    }


    override fun initAction() {
    }

    override fun initObserver() {
    }

    private fun hasCameraPermission(): Boolean {
        val activity = activity ?: return false
        return ContextCompat.checkSelfPermission(
            activity,
            Manifest.permission.CAMERA
        ) == PackageManager.PERMISSION_GRANTED
    }

    private fun requestPermission() {
        val activity = activity ?: return
        ActivityCompat.requestPermissions(
            activity,
            CAMERA_PERMISSION,
            CAMERA_REQUEST_CODE
        )
    }
}