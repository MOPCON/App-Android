package org.mopcon.android.util

import android.widget.ImageView
import android.widget.TextView
import androidx.annotation.DrawableRes
import androidx.annotation.IdRes
import androidx.databinding.BindingAdapter
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import com.bumptech.glide.Glide
import com.bumptech.glide.request.RequestOptions
import org.mopcon.android.R

fun TextView.setTimeFormat(timeStamp: Long?, format: String ?= MDHM_FORMAT) {
    text = timeStamp?.toTimeFormat(format)
}

@BindingAdapter("imageUrl")
fun ImageView.setGlideImg(imgUrl: String?) {
    Glide.with(this.context)
        .load(imgUrl)
        .apply(
            RequestOptions()
                .placeholder(R.drawable.loading_animation)
                .error(R.drawable.ic_avatar_default_logo)
        )
        .into(this)
}

fun ImageView.setGlideImg(@DrawableRes imgRes: Int?) {
    Glide.with(this.context)
        .load(imgRes)
        .apply(
            RequestOptions()
                .placeholder(R.drawable.ic_avatar_default_logo)
                .error(R.drawable.ic_avatar_default_logo)
        )
        .into(this)
}

fun FragmentManager.addFragmentToFragment(@IdRes containerViewId: Int, fragment: Fragment) {
    val ft = this.beginTransaction()
    ft.add(containerViewId, fragment, fragment.javaClass.name)
    ft.addToBackStack(null)
    ft.commit()
}