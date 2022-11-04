package org.mopcon.session.app.db

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query

@Dao
interface AgendaDao {

    @Query("SELECT * FROM agenda_table")
    fun getAll(): List<AgendaFavData>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(agenda: AgendaFavData)

    @Delete
    fun delete(agenda: AgendaFavData)

    @Query("DELETE FROM agenda_table WHERE sessionId = :sessionId")
    fun delete(sessionId: Int)

    @Query("SELECT sessionId FROM agenda_table")
    fun getAllSessionId(): List<Int>

}