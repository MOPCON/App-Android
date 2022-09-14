package org.mopcon.android.network.model.more.speaker


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@JsonClass(generateAdapter = true)
@Parcelize
data class Color(
    @Json(name = "mobile")
    val mobile: String?,
    @Json(name = "web")
    val web: String?
) : Parcelable