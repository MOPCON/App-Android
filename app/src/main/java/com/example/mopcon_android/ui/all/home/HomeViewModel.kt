package com.example.mopcon_android.ui.all.home

import androidx.lifecycle.*
import com.example.mopcon_android.network.model.home.Banner
import com.example.mopcon_android.network.model.home.HomeBannerNewsData
import com.example.mopcon_android.network.model.home.HomeBannerNewsResponse
import com.example.mopcon_android.network.model.home.NewsItem
import com.example.mopcon_android.util.request
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class HomeViewModel(private val repository: HomeRepository) : ViewModel() {
/*
    private val _bannerList = MutableLiveData<List<Banner>>()
    val bannerList: LiveData<List<Banner>> = _bannerList

    private val _newsList = MutableLiveData<List<NewsItem>>()
    val newsList: LiveData<List<NewsItem>> = _newsList
*/

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    private val _bannerAndNews = MutableLiveData<HomeBannerNewsData>()
    val bannerAndNews: LiveData<HomeBannerNewsData> = _bannerAndNews

    fun getHomeBannerAndNews() {
        viewModelScope.launch(Dispatchers.IO) {
            _isLoading.postValue(true)
            request(
                request = { repository.getHomeBannerAndNews() },
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


}
