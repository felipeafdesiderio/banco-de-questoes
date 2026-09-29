import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { PricingPlans } from '../../components/pricing/pricing-plans'
import { btnBack } from '../../lib/ui-styles'

export function Plans() {
  const navigate = useNavigate()

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }
    navigate('/')
  }

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <button type="button" onClick={handleBack} className={`${btnBack} mb-4`}>
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Voltar
        </button>
        <PricingPlans />
      </div>
    </div>
  )
}
