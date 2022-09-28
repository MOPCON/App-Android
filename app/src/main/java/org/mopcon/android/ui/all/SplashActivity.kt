package org.mopcon.android.ui.all

import android.annotation.SuppressLint
import android.content.Intent
import android.view.LayoutInflater
import org.koin.androidx.viewmodel.ext.android.viewModel
import org.mopcon.android.databinding.ActivitySplashBinding
import org.mopcon.android.ui.base.BaseBindingActivity
import org.mopcon.android.util.Constants

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
            it?.apiServer?.mopcon?.let { url -> Constants.setApiUrl(url) }
            it?.apiServer?.game?.let { url -> Constants.setGameUrl(url) }
            Constants.isGameEnable = it?.enableGame ?: true
            openMainActivity()
        }
    }

    private fun openMainActivity() {
        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }
}
