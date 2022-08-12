package com.example.mopcon_android.ui.all

import android.os.Bundle
import android.view.LayoutInflater
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.Navigation
import androidx.navigation.ui.NavigationUI
import com.example.mopcon_android.R
import com.example.mopcon_android.databinding.ActivityMainBinding
import com.example.mopcon_android.ui.all.home.HomeViewModel
import com.example.mopcon_android.ui.base.BaseBindingActivity
import com.google.android.material.bottomnavigation.BottomNavigationView
import org.koin.androidx.viewmodel.ext.android.viewModel

class MainActivity : BaseBindingActivity<ActivityMainBinding>() {

    override val bindingInflater: (LayoutInflater) -> ActivityMainBinding
        get() = ActivityMainBinding::inflate

    override fun initLayout() {
        val navController = Navigation.findNavController(this, R.id.mainContainer)
        NavigationUI.setupWithNavController(binding.bottomNavigation, navController)
    }

    override fun initAction() {

    }

    override fun initObserver() {

    }

}
