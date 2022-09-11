package com.example.mopcon_android.ui.all.home

import android.util.Log
import androidx.lifecycle.*
import com.example.mopcon_android.db.AgendaFavData
import com.example.mopcon_android.network.model.home.Banner
import com.example.mopcon_android.network.model.home.HomeBannerNewsData
import com.example.mopcon_android.network.model.home.HomeBannerNewsResponse
import com.example.mopcon_android.network.model.home.NewsItem
import com.example.mopcon_android.network.service.ApiService
import com.example.mopcon_android.repository.AgendaRepository
import com.example.mopcon_android.ui.base.BaseViewModel
import com.example.mopcon_android.util.request
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class HomeViewModel(private val apiService: ApiService, repository: AgendaRepository) : BaseViewModel(repository) {
    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    private val _bannerAndNews = MutableLiveData<HomeBannerNewsData>()
    val bannerAndNews: LiveData<HomeBannerNewsData> = _bannerAndNews

    private val _favAgendaList = MutableLiveData<List<AgendaFavData>>()
    val favAgendaList: LiveData<List<AgendaFavData>> = _favAgendaList

    val mediatorLiveData = MediatorLiveData<Pair<HomeBannerNewsData, List<AgendaFavData>>>()

    init {
        addSourceToMediatorLiveData()
    }

    private fun addSourceToMediatorLiveData() {

        mediatorLiveData.addSource(bannerAndNews) {
            //do something when bannerAndNews changed
        }
        mediatorLiveData.addSource(favAgendaList) {
            //do something when favAgendaList changed
        }
    }

    fun getHomeBannerAndNews() {
        viewModelScope.launch(Dispatchers.IO) {
            _isLoading.postValue(true)
            request(
                request = { apiService.getHomeBannerAndNews() },
                onSuccess = {
                    _isLoading.postValue(false)
                    _bannerAndNews.value = it.body()?.data
                },
                onError = {
                    _isLoading.postValue(false)
                }
            )
        }
    }

    fun getStoredAgenda() {
        viewModelScope.launch(Dispatchers.IO) {
            _favAgendaList.postValue(repository.getStoredAgenda())
        }
    }


}
