package org.mopcon.session.app.network.model.volunteer


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@JsonClass(generateAdapter = true)
@Parcelize
data class VolunteerResponse(
    @Json(name = "data")
    val `data`: Volunteer,
    @Json(name = "message")
    val message: String?,
    @Json(name = "success")
    val success: Boolean?
) : Parcelable