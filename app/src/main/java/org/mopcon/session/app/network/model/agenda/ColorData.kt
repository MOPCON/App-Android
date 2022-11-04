package org.mopcon.session.app.network.model.agenda


import android.os.Parcelable
import com.squareup.moshi.Json
import kotlinx.parcelize.Parcelize

@Parcelize
data class ColorData(
    @Json(name = "mobile")
    val mobile: String,
    @Json(name = "web")
    val web: String
): Parcelable