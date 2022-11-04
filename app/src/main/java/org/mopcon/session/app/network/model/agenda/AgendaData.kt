package org.mopcon.session.app.network.model.agenda


import com.squareup.moshi.Json

data class AgendaData(
    @Json(name = "date")
    val date: Int,
    @Json(name = "period")
    val periodData: List<PeriodData>
)