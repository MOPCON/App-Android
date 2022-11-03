package org.mopcon.session.app.ui.all

import android.util.Log
import android.view.LayoutInflater
import android.widget.Toast
import androidx.navigation.Navigation
import androidx.navigation.ui.NavigationUI
import com.google.android.gms.tasks.OnCompleteListener
import com.google.firebase.messaging.FirebaseMessaging
import org.mopcon.session.app.ui.base.BaseBindingActivity
import org.mopcon.session.app.ui.extension.OnBackPressedListener
import org.mopcon.session.app.R
import org.mopcon.session.app.databinding.ActivityMainBinding
import org.mopcon.session.app.ui.all.more.sponsor.detail.agenda.MoreAgendaDetailFragment
import timber.log.Timber


class MainActivity : BaseBindingActivity<ActivityMainBinding>() {

    override val bindingInflater: (LayoutInflater) -> ActivityMainBinding
        get() = ActivityMainBinding::inflate

    override fun initLayout() {
        val navController = Navigation.findNavController(this, R.id.mainContainer)
        NavigationUI.setupWithNavController(binding.bottomNavigation, navController)
        binding.bottomNavigation.setOnItemReselectedListener { item ->
            if (item.itemId != binding.bottomNavigation.selectedItemId) NavigationUI.onNavDestinationSelected(item, navController)
        }
    }

    private fun getFcmToken() {
        FirebaseMessaging.getInstance().token.addOnCompleteListener(OnCompleteListener { task ->
            if (!task.isSuccessful) {
                Timber.d("Fetching FCM registration token failed  ${task.exception}")
                return@OnCompleteListener
            }

            // Get new FCM registration token
            val token = task.result
            Timber.d("token = $token")
        })
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
//        val fragment = this.supportFragmentManager.findFragmentById(R.id.mainContainer)?.childFragmentManager?.fragments?.get(0)
//        (fragment as? OnBackPressedListener)?.onBackPressed()

        if (supportFragmentManager.backStackEntryCount >= 1) supportFragmentManager.popBackStack()
        else super.onBackPressed()

    }
}
