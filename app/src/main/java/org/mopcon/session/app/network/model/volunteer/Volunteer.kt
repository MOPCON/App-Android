package org.mopcon.session.app.network.model.volunteer


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@JsonClass(generateAdapter = true)
@Parcelize
data class Volunteer(
    @Json(name = "volunteer")
    val volunteer: List<VolunteerData>?
) : Parcelable