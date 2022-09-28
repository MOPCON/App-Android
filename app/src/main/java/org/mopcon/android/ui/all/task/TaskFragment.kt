package org.mopcon.android.ui.all.task

import android.Manifest
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.PermissionRequest
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import org.mopcon.android.databinding.FragmentTaskBinding
import org.mopcon.android.ui.base.BaseBindingFragment


class TaskFragment : BaseBindingFragment<FragmentTaskBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentTaskBinding
        get() = FragmentTaskBinding::inflate

    private val CAMERA_PERMISSION = arrayOf<String>(Manifest.permission.CAMERA)
    private val CAMERA_REQUEST_CODE = 10
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        if (!hasCameraPermission()) {
            requestPermission();
        }
        return super.onCreateView(inflater, container, savedInstanceState)
    }

    override fun initLayout() {
        initWebViewSetting()
    }

    private fun initWebViewSetting() {
        binding.apply {
            webView.settings.javaScriptEnabled = true
            webView.loadUrl("http://www.google.com")
//            webView.webViewClient = object : WebViewClient() {
//                override fun onPageFinished(view: WebView, url: String) {
//                    pageFinished = true
//                }
//            }
            webView.webChromeClient = object : WebChromeClient() {
                override fun onPermissionRequest(request: PermissionRequest) {
                    activity?.runOnUiThread { request.grant(request.resources) }
                }
            }

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
                webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
            }

            // Enable remote debugging via chrome://inspect
            if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                WebView.setWebContentsDebuggingEnabled(true);
            }
        }
    }

    override fun initAction() {
    }

    override fun initObserver() {
    }

//    override fun onCreateView(
//        inflater: LayoutInflater, container: ViewGroup?,
//        savedInstanceState: Bundle?
//    ): View? {
//        // Inflate the layout for this fragment
////        return inflater.inflate(R.layout.fragment_more, container, false)
//        binding = FragmentMoreBinding.inflate(inflater)
//        return binding.root
//    }


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