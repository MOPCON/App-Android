package org.mopcon.session.app.ui.common

import android.content.Context
import android.util.AttributeSet
import android.view.LayoutInflater
import android.view.View
import android.widget.FrameLayout
import android.widget.ImageView
import android.widget.TextView
import androidx.core.view.isVisible
import org.mopcon.session.app.R

class TitleBar @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyle: Int = 0
) : FrameLayout(context, attrs, defStyle) {

    private val typedArray by lazy {
        context.theme.obtainStyledAttributes(
            attrs,
            R.styleable.CustomTitleBar,
            0,
            0
        )
    }

    var text : String ?= typedArray.getString(R.styleable.CustomTitleBar_titleText)
        set(value) {
            tvTitle.text = value
            field = value
        }

    private val tvTitle: TextView by lazy { findViewById(R.id.tvTitle) }
    private val ivBack: ImageView by lazy { findViewById(R.id.ivBack) }

    var backPressedListener: (() -> Unit)? = null

    init {
        val view = LayoutInflater.from(context).inflate(R.layout.item_title_bar_with_back_button, this, false)
        addView(view)
        initView(view)
    }

    private fun initView(view: View) {
        view.apply {
            tvTitle.text = typedArray.getString(R.styleable.CustomTitleBar_titleText)
            ivBack.isVisible = typedArray.getBoolean(R.styleable.CustomTitleBar_isShowBackButton, true)
            ivBack.setOnClickListener {
                backPressedListener?.invoke()
            }
        }
    }

}