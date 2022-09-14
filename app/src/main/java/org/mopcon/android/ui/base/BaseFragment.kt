package org.mopcon.android.ui.base

import androidx.fragment.app.Fragment

open class BaseFragment : Fragment() {

    open fun loading(message: String? = null) {
        if (activity is BaseActivity)
            (activity as BaseActivity).loading(message)
    }

    open fun hideLoading() {
        if (activity is BaseActivity)
            (activity as BaseActivity).hideLoading()
    }

    open fun hideKeyboard() {
        if (activity is BaseActivity)
            (activity as BaseActivity).hideKeyboard()
    }
}