package org.mopcon.android.ui.all.task

import android.view.LayoutInflater
import android.view.ViewGroup
import android.webkit.WebViewClient
import org.mopcon.android.databinding.FragmentTaskBinding
import org.mopcon.android.ui.base.BaseBindingFragment

class TaskFragment : BaseBindingFragment<FragmentTaskBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentTaskBinding
        get() = FragmentTaskBinding::inflate

    val url = "https://www.google.com/"

    override fun initLayout() {

    }

    override fun initAction() {
        binding.apply {
//            webView.settings.javaScriptEnabled = true
//            webView.settings.pluginState = WebSettings.PluginState.ON;
//            setContentView(webView);
            webView.webViewClient = WebViewClient()
            webView.settings.javaScriptEnabled = true
            webView.loadUrl("http://www.google.com");
        }
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


}