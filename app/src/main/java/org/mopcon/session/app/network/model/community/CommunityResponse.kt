package org.mopcon.session.app.network.model.community


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@JsonClass(generateAdapter = true)
@Parcelize
data class CommunityResponse(
    @Json(name = "data")
    val data: Community,
    @Json(name = "message")
    val message: String?,
    @Json(name = "success")
    val success: Boolean?
) : Parcelable