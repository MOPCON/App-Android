package com.example.mopcon_android.ui.all.home

import androidx.lifecycle.*
import com.example.mopcon_android.network.model.home.Banner
import com.example.mopcon_android.network.model.home.NewsItem
import com.example.mopcon_android.network.service.HomeApiService
import com.example.mopcon_android.util.request
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class HomeViewModel(private val repository: HomeRepository) : ViewModel() {

    private val _bannerList = MutableLiveData<List<Banner>>()
    val bannerList: LiveData<List<Banner>> = _bannerList

    private val _newsList = MutableLiveData<List<NewsItem>>()
    val newsList: LiveData<List<NewsItem>> = _newsList

    fun getHomeBannerAndNews() {
        viewModelScope.launch(Dispatchers.IO) {
            request(
                request = { repository.getHomeBannerAndNews() },
                onSuccess = {
                    _bannerList.value = it.body()?.data?.banner
                    _newsList.value = it.body()?.data?.news
                },
                onError = { }
            )
        }
    }


}
