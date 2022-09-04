package com.example.mopcon_android.ui.common

import android.content.Context
import android.util.AttributeSet
import android.view.LayoutInflater
import android.view.View
import android.widget.FrameLayout
import android.widget.ImageView
import androidx.core.view.isVisible
import com.example.mopcon_android.R
import com.example.mopcon_android.util.openWeb

class MediaBar @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyle: Int = 0
) : FrameLayout(context, attrs, defStyle) {

    private val web: ImageView by lazy { findViewById(R.id.ivWebsite) }
    private val fb: ImageView by lazy { findViewById(R.id.ivFb) }
    private val ig: ImageView by lazy { findViewById(R.id.ivIg) }
    private val linkedIn: ImageView by lazy { findViewById(R.id.ivLinkedIn) }
    private val git: ImageView by lazy { findViewById(R.id.ivGithub) }
    private val twitter: ImageView by lazy { findViewById(R.id.ivTwitter) }

    var webPressedListener: (() -> String)? = null
    var fbPressedListener: (() -> String)? = null
    var igPressedListener: (() -> String)? = null
    var linkedInPressedListener: (() -> String)? = null
    var gitPressedListener: (() -> String)? = null
    var twitterPressedListener: (() -> String)? = null

    init {
        val view = LayoutInflater.from(context).inflate(R.layout.item_social_media, this, false)
        addView(view)
        initView(view)
    }

    private fun initView(view: View) {
        view.apply {
            web.setOnClickListener { openWeb(context, webPressedListener?.invoke()) }
            fb.setOnClickListener { openWeb(context, fbPressedListener?.invoke()) }
            ig.setOnClickListener { openWeb(context, igPressedListener?.invoke()) }
            linkedIn.setOnClickListener { openWeb(context, linkedInPressedListener?.invoke()) }
            git.setOnClickListener { openWeb(context, gitPressedListener?.invoke()) }
            twitter.setOnClickListener { openWeb(context, twitterPressedListener?.invoke()) }
        }
    }

    fun setItemVisibility(showWeb: Boolean, showFb: Boolean, showIg: Boolean, showLinkedIn: Boolean, showGit: Boolean, showTwitter: Boolean) {
        web.isVisible = showWeb
        fb.isVisible = showFb
        ig.isVisible = showIg
        linkedIn.isVisible = showLinkedIn
        git.isVisible = showGit
        twitter.isVisible = showTwitter
    }

    fun setOnClickOpenWeb(webUrl: String?, fbUrl: String?, igUrl: String?, linkedInUrl: String?, gitUrl: String?, twitterUrl: String?) {
        web.setOnClickListener { openWeb(context, webUrl) }
        fb.setOnClickListener { openWeb(context, fbUrl) }
        ig.setOnClickListener { openWeb(context, igUrl) }
        linkedIn.setOnClickListener { openWeb(context, linkedInUrl) }
        git.setOnClickListener { openWeb(context, gitUrl) }
        twitter.setOnClickListener { openWeb(context, twitterUrl) }
    }

}