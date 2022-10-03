package org.mopcon.session.app.ui.all

import android.annotation.SuppressLint
import android.content.Intent
import android.util.Log
import android.view.LayoutInflater
import org.koin.androidx.viewmodel.ext.android.viewModel
import org.mopcon.session.app.databinding.ActivitySplashBinding
import org.mopcon.session.app.ui.base.BaseBindingActivity
import org.mopcon.session.app.util.Constants

@SuppressLint("CustomSplashScreen")
class SplashActivity : BaseBindingActivity<ActivitySplashBinding>() {

    override val bindingInflater: (LayoutInflater) -> ActivitySplashBinding
        get() = ActivitySplashBinding::inflate

    private val viewModel: SplashViewModel by viewModel()

    override fun initLayout() {}

    override fun initAction() {
        viewModel.getInit()
    }

    override fun initObserver() {
        viewModel.initial.observe(this) {
//            it?.apiServer?.mopcon?.let { url -> Constants.setApiUrl(url) } //又不要這個了==
            it?.apiServer?.game?.let { url -> Constants.setGameUrl(url)
            Log.e(">>>", "url = $url")}
            Constants.isGameEnable = it?.enableGame ?: true
            openMainActivity()
        }
    }

    private fun openMainActivity() {
        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }
}
