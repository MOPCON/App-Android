package org.mopcon.session.app.ui.base

import android.os.Bundle
import android.view.LayoutInflater
import androidx.viewbinding.ViewBinding

abstract class BaseBindingActivity<VB : ViewBinding> : BaseActivity() {
    lateinit var binding: VB
        private set
    abstract val bindingInflater: (LayoutInflater) -> VB

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = bindingInflater(layoutInflater)
        setContentView(binding.root)

        initLayout()
        initAction()
        initObserver()
    }

    abstract fun initLayout()
    abstract fun initAction()
    abstract fun initObserver()
}