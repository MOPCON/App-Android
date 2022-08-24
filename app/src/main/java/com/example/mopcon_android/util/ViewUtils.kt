package com.example.mopcon_android.util

import android.widget.ImageView
import android.widget.TextView
import androidx.databinding.BindingAdapter
import com.bumptech.glide.Glide
import com.bumptech.glide.request.RequestOptions
import com.example.mopcon_android.R

fun TextView.setTimeFormat(timeStamp: Long?, format: String ?= MDHM_FORMAT) {
    text = timeStamp?.toTimeFormat(format)
}

@BindingAdapter("imageUrl")
fun ImageView.setGlideImg(imgUrl: String?) {
    Glide.with(this.context)
        .load(imgUrl)
        .apply(
            RequestOptions()
                .placeholder(R.drawable.ic_avatar_default_logo)
                .error(R.drawable.ic_avatar_default_logo)
        )
        .into(this)
}
