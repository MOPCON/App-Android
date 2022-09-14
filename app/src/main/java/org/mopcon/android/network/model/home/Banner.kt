package org.mopcon.android.network.model.home


import com.squareup.moshi.Json
import com.stx.xhb.androidx.entity.BaseBannerInfo

data class Banner(
    @Json(name = "img")
    val img: String,
    @Json(name = "link")
    val link: String
): BaseBannerInfo {
    override fun getXBannerUrl() = link
    override fun getXBannerTitle() = ""
}