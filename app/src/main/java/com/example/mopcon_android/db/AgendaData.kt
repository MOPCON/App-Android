package com.example.mopcon_android.db

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "agenda_table")
data class AgendaData(
    @PrimaryKey(autoGenerate = true) val id: Int? = null,
    @ColumnInfo(name = "agenda") val agenda: String //example
    //TODO: put agenda data class item from api.
)
