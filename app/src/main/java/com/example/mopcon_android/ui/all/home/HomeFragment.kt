package com.example.mopcon_android.ui.all.home

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.mopcon_android.databinding.FragmentHomeBinding
import com.example.mopcon_android.ui.base.BaseBindingFragment
import org.koin.androidx.viewmodel.ext.android.viewModel

class HomeFragment : BaseBindingFragment<FragmentHomeBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentHomeBinding = FragmentHomeBinding::inflate

    private val viewModel: HomeViewModel by viewModel()

    override fun initLayout() {
    }

    override fun initAction() {
        viewModel.getHomeBannerAndNews()
    }

    override fun initObserver() {

        viewModel.bannerList.observe (viewLifecycleOwner) {
            //TODO: banner vp
        }

        viewModel.newsList.observe (viewLifecycleOwner) {
            //TODO: news rv
        }

    }


}