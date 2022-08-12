package com.example.mopcon_android.ui.base

import android.content.Context
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.view.View
import android.view.inputmethod.InputMethodManager
import android.widget.LinearLayout
import android.widget.RelativeLayout
import com.example.mopcon_android.R
import timber.log.Timber

open class BaseActivity : AppCompatActivity() {

    private var view: View? = null
    private val loadingView by lazy { view?.findViewById<LinearLayout>(R.id.ll_loading) }

    open fun loading(message: String?= null) {
        if (view == null) {
            view = layoutInflater.inflate(R.layout.layout_loading, null)
            val params = RelativeLayout.LayoutParams(
                RelativeLayout.LayoutParams.MATCH_PARENT,
                RelativeLayout.LayoutParams.MATCH_PARENT
            )
            addContentView(view, params)
        } else {
            loadingView?.visibility = View.VISIBLE
            loadingView?.isClickable = true
        }
    }

    open fun hideLoading() {
        if (view == null) {
            Timber.d("loadingView不存在")
        } else {
            loadingView?.visibility = View.GONE
        }
    }

    open fun hideKeyboard() {
        try {
            val inputMethodManager = this.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
            val focusedView = this.currentFocus
            if (inputMethodManager.isActive && focusedView != null) {
                inputMethodManager.hideSoftInputFromWindow(focusedView.windowToken, 0)
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

}