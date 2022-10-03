package org.mopcon.session.app.ui.all.more.speaker

import androidx.lifecycle.*
import org.mopcon.session.app.network.model.more.speaker.SpeakerData
import org.mopcon.session.app.network.service.ApiService
import org.mopcon.session.app.repository.AgendaRepository
import org.mopcon.session.app.ui.base.BaseViewModel
import org.mopcon.session.app.util.request
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class SpeakerViewModel(private val apiService: ApiService, repository: AgendaRepository) : BaseViewModel(repository) {

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    private val _speakers = MutableLiveData<List<SpeakerData>>()
    val speakers: LiveData<List<SpeakerData>> = _speakers

    fun getSpeakers() {
        viewModelScope.launch(Dispatchers.IO) {
            _isLoading.postValue(true)
            request(
                request = { apiService.getSpeaker() },
                onSuccess = {
                    _isLoading.postValue(false)
                    _speakers.postValue(it.body()?.data ?: listOf())
                },
                onError = {
                    _isLoading.postValue(false)
                }
            )
        }
    }
}
