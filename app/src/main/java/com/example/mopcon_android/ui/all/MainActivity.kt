package com.example.mopcon_android.ui.all

import android.view.LayoutInflater
import androidx.navigation.Navigation
import androidx.navigation.ui.NavigationUI
import com.example.mopcon_android.R
import com.example.mopcon_android.databinding.ActivityMainBinding
import com.example.mopcon_android.ui.base.BaseBindingActivity

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

    fun setTabToAgenda() {
        binding.bottomNavigation.selectedItemId = R.id.agendaFragment
    }

    fun setTabToNews() {
        binding.bottomNavigation.selectedItemId = R.id.newsFragment
    }

    override fun onBackPressed() {
        if (supportFragmentManager.backStackEntryCount >= 1) supportFragmentManager.popBackStack()
        else super.onBackPressed()
    }
}
