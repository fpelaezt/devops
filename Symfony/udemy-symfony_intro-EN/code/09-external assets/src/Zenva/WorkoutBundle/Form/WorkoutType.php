<?php

namespace Zenva\WorkoutBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class WorkoutType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('occurrenceDate')
            ->add('activity')
            ->add('hours');
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Zenva\WorkoutBundle\Entity\Workout'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'zenva_workoutbundle_workouttype';
    }
}
