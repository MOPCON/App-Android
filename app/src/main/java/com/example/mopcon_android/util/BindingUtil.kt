package com.example.mopcon_android.util

import android.widget.ImageView
import androidx.databinding.BindingAdapter
import com.bumptech.glide.Glide
import com.bumptech.glide.request.RequestOptions
import com.example.mopcon_android.R

@BindingAdapter("imageUrl")
fun ImageView.glideLoadImg(imgUrl: String?) {
    Glide.with(this.context)
        .load(imgUrl)
        .apply(
            RequestOptions()
                .placeholder(R.drawable.loading_animation)
                .error(R.drawable.ic_baseline_broken_image_24)
        )
        .into(this)
}
