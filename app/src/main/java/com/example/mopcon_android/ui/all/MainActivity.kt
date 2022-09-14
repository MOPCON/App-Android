package com.example.mopcon_android.ui.all

import android.util.Log
import android.view.LayoutInflater
import androidx.fragment.app.FragmentActivity
import androidx.navigation.Navigation
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.NavigationUI
import com.example.mopcon_android.R
import com.example.mopcon_android.databinding.ActivityMainBinding
import com.example.mopcon_android.ui.all.home.HomeFragment
import com.example.mopcon_android.ui.all.more.sponsor.detail.agenda.MoreAgendaDetailFragment
import com.example.mopcon_android.ui.base.BaseBindingActivity
import com.example.mopcon_android.ui.extension.OnBackPressedListener


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

    private var activity: FragmentActivity? = null

    fun IOnBackPressed(activity: FragmentActivity) {
        this.activity = activity
    }

    override fun onBackPressed() {
        Log.e(">>>", "onBackPressed, ${supportFragmentManager.backStackEntryCount}")

        val fragment = this.supportFragmentManager.findFragmentById(R.id.mainContainer)?.childFragmentManager?.fragments?.get(0)
        (fragment as? OnBackPressedListener)?.onBackPressed()

        if (supportFragmentManager.backStackEntryCount >= 1) supportFragmentManager.popBackStack()
        else super.onBackPressed()

    }
}
