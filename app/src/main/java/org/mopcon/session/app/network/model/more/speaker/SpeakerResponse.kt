package org.mopcon.session.app.network.model.more.speaker


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@JsonClass(generateAdapter = true)
@Parcelize
data class SpeakerResponse(
    @Json(name = "data")
    val data: List<SpeakerData>?,
    @Json(name = "message")
    val message: String?,
    @Json(name = "success")
    val success: Boolean?
) : Parcelable