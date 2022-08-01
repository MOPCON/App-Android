package com.example.mopcon_android.ui.all.home

import android.util.Log
import android.view.LayoutInflater
import android.view.ViewGroup
import com.example.mopcon_android.databinding.FragmentHomeBinding
import com.example.mopcon_android.ui.base.BaseBindingFragment
import org.koin.androidx.viewmodel.ext.android.viewModel

class HomeFragment : BaseBindingFragment<FragmentHomeBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentHomeBinding = FragmentHomeBinding::inflate

    override fun initLayout() {
    }

    override fun initAction() {
    }

    override fun initObserver() {

    }


}