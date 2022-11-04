package org.mopcon.session.app.ui.all.task

import android.Manifest
import android.R.attr.bitmap
import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.media.MediaScannerConnection
import android.net.Uri
import android.os.Bundle
import android.os.Environment
import android.provider.MediaStore
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
import io.github.g00fy2.quickie.QRResult
import io.github.g00fy2.quickie.ScanQRCode
import org.koin.androidx.viewmodel.ext.android.viewModel
import org.mopcon.session.app.R
import org.mopcon.session.app.databinding.FragmentTaskBinding
import org.mopcon.session.app.ui.base.BaseBindingFragment
import org.mopcon.session.app.util.BitmapUtil
import org.mopcon.session.app.util.Constants
import timber.log.Timber
import java.io.*
import java.util.*


class TaskFragment : BaseBindingFragment<FragmentTaskBinding>() {
    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentTaskBinding
        get() = FragmentTaskBinding::inflate

    private val viewModel: TaskViewModel by viewModel()

    companion object {
        private const val SPF_UUID = "UUID"
        private const val SPF_DATA = "DATA"
    }

    private val PERMISSION_LIST = arrayOf(Manifest.permission.CAMERA, Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.WRITE_EXTERNAL_STORAGE)
    private val PERMISSION_REQUEST_CODE = 10
    private val WRITE_EXTERNAL_STORAGE_CODE = 11

    private val scanQrCodeLauncher = registerForActivityResult(ScanQRCode()) { result: QRResult ->
        when (result) {
            is QRResult.QRSuccess -> {
                val qrCodeUrl = result.content.rawValue
                callFunction { binding.webView.evaluateJavascript("onQRCodeScaned(('{\"data\": \"${qrCodeUrl}\"}'))", null) }
            }
            QRResult.QRUserCanceled -> {}
            QRResult.QRMissingPermission -> requestPermission()
            is QRResult.QRError -> Timber.e("${result.exception.javaClass.simpleName}: ${result.exception.localizedMessage}")
        }

    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        if (!hasCameraPermission() || !hasStorePermission()) {
            requestPermission();
        }
        return super.onCreateView(inflater, container, savedInstanceState)
    }

    override fun initLayout() {
        initWebViewSetting()
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun initWebViewSetting() {
        binding.apply {
            val webSettings = webView.settings
            webSettings.javaScriptEnabled = true
            webSettings.loadWithOverviewMode = true
            webSettings.useWideViewPort = true
            webSettings.domStorageEnabled = true;
            webSettings.setSupportZoom(true)
            WebView.setWebContentsDebuggingEnabled(true)
            webView.webViewClient = MyWebViewClient(binding.progressBar)

            webView.webChromeClient = object : WebChromeClient() {
                override fun onConsoleMessage(message: ConsoleMessage): Boolean {
                    Timber.d("${message.message()} -- From line ${message.lineNumber()} of ${message.sourceId()}")
                    return true
                }
            }

            webView.loadUrl(Constants.getGameUrl())
//            webView.loadUrl("https://game.mopcon.org/#/test")

            //java 調用 js function
            webView.addJavascriptInterface(JSInterface(context,
                { //sendDeviceId
                    callFunction { webView.evaluateJavascript("getDeviceIDResponse(\"${getIdentity()}\")", null) }
                }, { //loadPreferenceResponse
                    callFunction { webView.evaluateJavascript("loadPreferenceResponse(${getStoredValue()})", null) }
                }, { //qrCode
                    if (!hasCameraPermission()) requestPermission()
                    else scanQrCodeLauncher.launch(null)
                }, { data -> //share
                    val uri = BitmapUtil.stringToBitmap(data)?.let { getImageUri(it) }
                    val shareIntent: Intent = Intent().apply {
                        action = Intent.ACTION_SEND
                        putExtra(Intent.EXTRA_STREAM, uri)
                        type = "image/png"
                    }
                    startActivity(Intent.createChooser(shareIntent, resources.getText(R.string.share_to)))
                }, { data -> //storeImage
                    if (!hasStorePermission()) requestPermission()
                    else BitmapUtil.stringToBitmap(data)?.let { storeBitmapToStorage(it) }
                }
            ), "nativeApp")
        }
    }

    fun getImageUri(bitmap: Bitmap): Uri? {
        val bytes = ByteArrayOutputStream()
        bitmap.compress(Bitmap.CompressFormat.JPEG, 100, bytes)
        val path = MediaStore.Images.Media.insertImage(context?.contentResolver, bitmap, "Title", null)
        return Uri.parse(path)
    }

    //java 傳參數給 js
    private fun callFunction(callJsFun: () -> Unit) {
        binding.webView.post {
            try {
                callJsFun.invoke()
            } catch (e: Exception) {
                Timber.e("e = $e")
            }
        }
    }

    override fun initAction() {
    }

    override fun initObserver() {
        viewModel.storedImage.observe(viewLifecycleOwner) {
            if (it.first) Toast.makeText(context, "儲存圖片成功", Toast.LENGTH_SHORT).show() //R.string.storeImageSucceed
            else Toast.makeText(context, "儲存圖片失敗，請再試一次", Toast.LENGTH_SHORT).show()
            MediaScannerConnection.scanFile(context, arrayOf(it.second), arrayOf("image/jpeg"), null);
        }
    }

    private fun hasCameraPermission(): Boolean {
        val activity = activity ?: return false
        return ContextCompat.checkSelfPermission(
            activity,
            Manifest.permission.CAMERA
        ) == PackageManager.PERMISSION_GRANTED
    }

    private fun hasStorePermission(): Boolean {
        val activity = activity ?: return false
        return ContextCompat.checkSelfPermission(
            activity,
            Manifest.permission.WRITE_EXTERNAL_STORAGE
        ) == PackageManager.PERMISSION_GRANTED
    }

    private fun requestPermission() {
        val activity = activity ?: return
        ActivityCompat.requestPermissions(
            activity,
            PERMISSION_LIST,
            PERMISSION_REQUEST_CODE,
        )
    }

    private fun getIdentity(): String {
        val preference = context?.getSharedPreferences(SPF_UUID, 0)
        var identity = preference?.getString("identity", null)
        if (identity == null) {
            identity = UUID.randomUUID().toString()
            preference?.edit()?.putString("identity", identity)?.apply()
        }
        return identity
    }

    private fun getStoredValue(): String? {
        val preference = context?.getSharedPreferences(SPF_DATA, 0)
        return preference?.getString("data", null)
    }

    private fun storeBitmapToStorage(bitmap: Bitmap) {
        viewModel.storeImageToStorage(bitmap)
//        val newfile = savebitmap(bitmap)
//        newfile?.createNewFile()
//        val file = File(Environment.getExternalStorageDirectory().toString() + File.separator + "mopcon_succeed.jpg")
//        file.createNewFile()
//        savebitmap(bitmap)
    }

    internal class JSInterface(
        val context: Context?,
        private val getDeviceSucceed: () -> Unit,
        private val loadPreferenceSucceed: () -> Unit,
        private val qrcodeScanned: () -> Unit,
        private val shareSucceed: (String) -> Unit,
        private val saveImageSucceed: (String) -> Unit,
    ) {
        @JavascriptInterface
        fun getDeviceID() {
            getDeviceSucceed.invoke()
        }

        @JavascriptInterface
        fun loadPreference() {
            loadPreferenceSucceed.invoke()
        }

        @JavascriptInterface
        fun storePreference(data: String) {
            try {
                storeValue(data)
            } catch (e: Exception) {
                Timber.e("storePreference e = $e")
            }
        }

        @JavascriptInterface
        fun scanQRCode() {
            qrcodeScanned.invoke()
        }

        @JavascriptInterface
        fun socialShare(data: String) {
            shareSucceed.invoke(data)
        }

        @JavascriptInterface
        fun saveImage(data: String) {
            saveImageSucceed.invoke(data)
        }

        private fun storeValue(data: String): String {
            val preference = context?.getSharedPreferences(SPF_DATA, 0)
            var spfData = preference?.getString("data", null)
            if (spfData == null) {
                spfData = data
                preference?.edit()?.putString("data", spfData)?.apply()
            }
            return spfData
        }
    }

}