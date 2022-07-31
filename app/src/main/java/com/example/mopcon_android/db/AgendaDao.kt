package com.example.mopcon_android.db

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query

@Dao
interface AgendaDao {

    @Query("SELECT * FROM agenda_table")
    fun getAll(): List<AgendaData>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(word: AgendaData): Long

    @Delete
    fun delete(word: AgendaData)

}