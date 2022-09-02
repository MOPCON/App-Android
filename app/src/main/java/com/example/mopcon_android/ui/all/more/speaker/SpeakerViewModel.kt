package com.example.mopcon_android.ui.all.more.speaker

import androidx.lifecycle.*
import com.example.mopcon_android.network.model.more.speaker.SpeakerData
import com.example.mopcon_android.network.service.ApiService
import com.example.mopcon_android.util.request
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class SpeakerViewModel(private val apiService: ApiService) : ViewModel() {

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
