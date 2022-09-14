package org.mopcon.android.network.model.community_detail


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@JsonClass(generateAdapter = true)
@Parcelize
data class CommunityDetailData(
    @Json(name = "event")
    val event: String?,
    @Json(name = "facebook")
    val facebook: String?,
    @Json(name = "instagram")
    val instagram: String?,
    @Json(name = "introduction")
    val introduction: String?,
    @Json(name = "introduction_e")
    val introductionE: String?,
    @Json(name = "name")
    val name: String?,
    @Json(name = "name_e")
    val nameE: String?,
    @Json(name = "photo")
    val photo: String?,
    @Json(name = "telegram")
    val telegram: String?,
    @Json(name = "twitter")
    val twitter: String?
) : Parcelable