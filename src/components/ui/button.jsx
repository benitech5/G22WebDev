import React, { useState } from 'react'

/**
 * Button Component
 *
 * Props:
 * - action       {Function}  onClick handler
 * - innerText    {string}    Button label text
 * - colour       {string}    'primary' | 'outline' | 'ghost' | 'danger' | 'white' | any hex/CSS color
 * - height       {number|string} Custom height in px or CSS string
 * - width        {number|string} Custom width in px or CSS string, or 'full' for 100%
 * - variant      {string}    Shorthand: 'primary' | 'outline' | 'ghost' | 'danger' | 'sm' | 'lg'
 * - icon         {Component} Optional lucide icon to show before text
 * - iconRight    {Component} Optional lucide icon to show after text
 * - disabled     {boolean}   Disabled state
 * - loading      {boolean}   Loading state (shows spinner, disables interaction)
 * - type         {string}    'button' | 'submit' | 'reset'
 * - className    {string}    Additional CSS classes
 * - children     {node}      Alternative to innerText
 */
export default function Button({
  action,
  innerText,
  children,
  colour,
  height,
  width,
  variant = 'primary',
  icon: Icon,
  iconRight: IconRight,
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  style = {},
  ...rest
}) {
  const [isPressed, setIsPressed] = useState(false)

  // Resolve base class from variant or colour
  const getVariantClass = () => {
    if (colour === 'primary' || variant === 'primary') return 'btn btn-primary'
    if (colour === 'outline' || variant === 'outline') return 'btn btn-blue'
    if (colour === 'ghost' || variant === 'ghost') return 'btn btn-ghost'
    if (colour === 'danger' || variant === 'danger') return 'btn btn-danger'
    if (variant === 'sm') return 'btn btn-ghost btn-sm'
    if (variant === 'lg') return 'btn btn-primary btn-lg'
    // Default
    return 'btn btn-primary'
  }

  // Resolve custom inline styles
  const customStyles = {
    ...(height ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
    ...(width === 'full' ? { width: '100%' } : width ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    // Custom colour (if not a named variant)
    ...(colour && !['primary', 'outline', 'ghost', 'danger', 'white'].includes(colour)
      ? { background: colour, borderColor: colour, color: '#fff' }
      : {}),
    // Pressed state micro-animation
    ...(isPressed ? { transform: 'scale(0.97)', opacity: 0.88 } : {}),
    // Disabled style
    ...(disabled || loading ? { opacity: 0.55, cursor: 'not-allowed', pointerEvents: 'none' } : {}),
    transition: 'all 0.15s',
    ...style,
  }

  const label = innerText ?? children

  return (
    <button
      type={type}
      className={`${getVariantClass()} ${className}`}
      style={customStyles}
      onClick={(!disabled && !loading) ? action : undefined}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <>
          <LoadingSpinner />
          {label}
        </>
      ) : (
        <>
          {Icon && <Icon size={16} />}
          {label}
          {IconRight && <IconRight size={16} />}
        </>
      )}
    </button>
  )
}

function LoadingSpinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ animation: 'hl-spin 0.75s linear infinite', flexShrink: 0 }}
    >
      <style>{`@keyframes hl-spin { to { transform: rotate(360deg); } }`}</style>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.5" />
      <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}